defmodule Ekf.EmailView do
  use Ekf.Web, :view
  
  def render("ok.json", email) do
    %{status: "ok"}
  end
end
