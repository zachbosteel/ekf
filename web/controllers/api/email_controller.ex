defmodule Ekf.EmailController do
  use Ekf.Web, :controller

  def deliver(conn, params) do
    sanitize(params)
    |> Ekf.Email.contact_form_email 
    |> Ekf.Mailer.deliver_now
    render(conn, "ok.json", params)
  end

  defp sanitize(params) do
    Enum.map(params, fn {k, v} -> {String.to_atom(k), v} end)
    |> Enum.into(%{})
  end
end
