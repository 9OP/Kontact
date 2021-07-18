export interface IChannel {
  id: string;
  name: string;
  createdAt: Date;
  material: IChannelMaterial;
}

export interface IChannelMaterial {
  pcek: string; // public channel encryption key
  scek: string; // secret channel encryption key
}
