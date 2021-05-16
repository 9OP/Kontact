package pkg

import (
	"fmt"
	"reflect"
	"strings"
)

type Validator struct {
	I interface{}
}

func NewValidator(input interface{}) *Validator {
	return &Validator{input}
}

func (m *Validator) Validate() error {
	fields := reflect.ValueOf(m.I).Elem()
	for i := 0; i < fields.NumField(); i++ {

		tag := fields.Type().Field(i).Tag.Get("validation")
		if strings.Contains(tag, "required") && fields.Field(i).IsZero() {
			return fmt.Errorf("required field: `%v` is missing", fields.Type().Field(i).Tag.Get("json"))
		}

	}
	return nil
}
