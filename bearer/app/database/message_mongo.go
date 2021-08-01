package repository

import (
	"context"
	"log"
	"time"

	"github.com/9op/Kontact/bearer/app/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// implements usecase/message/interface.Repository
type MongoRepo struct {
	URL        string
	Collection *mongo.Collection
	Ctx        context.Context
}

func NewMongoRepo(URL string) *MongoRepo {
	return &MongoRepo{
		URL: URL,
	}
}

func (r *MongoRepo) init() func() {
	clientOptions := options.Client().ApplyURI(r.URL)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}

	r.Collection = client.Database("kontact").Collection("messages")
	r.Ctx = ctx

	return func() {
		client.Disconnect(r.Ctx)
		cancel()
	}
}

func (r *MongoRepo) List(channelId string) ([]*entity.Message, error) {
	cancel := r.init()
	defer cancel()

	filter := bson.M{"channelid": channelId} // mongo lowercase bson field
	var messages = []*entity.Message{}

	cur, err := r.Collection.Find(r.Ctx, filter)
	if err != nil {
		return messages, err
	}

	for cur.Next(r.Ctx) {
		var e entity.Message
		if err := cur.Decode(&e); err != nil {
			return messages, err
		}
		messages = append(messages, &e)
	}

	if err := cur.Err(); err != nil {
		return messages, err
	}

	// once exhausted, close the cursor
	cur.Close(r.Ctx)
	return messages, nil
}

func (r *MongoRepo) Create(e *entity.Message) (*entity.Message, error) {
	cancel := r.init()
	defer cancel()

	inserted, err := r.Collection.InsertOne(r.Ctx, e)
	if err != nil {
		return nil, err
	}
	id := inserted.InsertedID

	// cast and convert id to string
	e.Id = id.(primitive.ObjectID).Hex()

	return e, nil
}
