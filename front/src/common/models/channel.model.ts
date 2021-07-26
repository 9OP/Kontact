export interface IChannel {
  id: string;
  name: string;
  createdAt: Date;
  material: IChannelMaterial;
}

export interface IChannelMaterial {
  scek: string; // secret channel encryption key
}
