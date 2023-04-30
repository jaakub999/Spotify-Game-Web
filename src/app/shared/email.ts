import { EmailType } from "./email-type";

export interface Email {
  address: string;
  type: EmailType;
  show: boolean;
}
