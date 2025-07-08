import { redirect } from "next/navigation";

export default function RedirectToDefaultMenu() {
  redirect("/menu/coffee");
}
