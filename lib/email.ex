defmodule Ekf.Email do
  use Bamboo.Phoenix, view: Ekf.EmailView

  def contact_form_email(email) do
    new_email()
    |> to({"EKF Martial Arts", "extremekungfu@gmail.com"})
    |> from({"#{email.first_name} #{email.last_name}", "inquiries@ekfmartialarts.com"})
    |> subject("Contact Form Submission - #{email.subject}")
    |> assign(:email, email)
    |> put_header("Reply-To", email.email_address)
    |> put_html_layout({Ekf.LayoutView, "email.html"})
    |> render("contact.html")
  end

end
