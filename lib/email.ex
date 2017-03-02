defmodule Ekf.Email do
  use Bamboo.Phoenix, view: Ekf.EmailView

  def contact_form_email(email) do
    new_email()
    |> to({"Zach Bosteel", "zbosteel@gmail.com"})
    |> from({"#{email.first_name} #{email.last_name}", email.email_address})
    |> subject(email.subject)
    |> assign(:email, email)
    |> put_html_layout({Ekf.LayoutView, "email.html"})
    |> render("contact.html")
  end

end
