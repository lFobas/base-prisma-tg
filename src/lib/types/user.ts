export interface iUser {
  id: string;
  name: string;
  telegramId: string;
  email: string;
  role: Role     
  
}

enum Role {
  GUEST = "GUEST",
  ADMIN = "ADMIN",
  USER = "USER"}