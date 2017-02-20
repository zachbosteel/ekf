defmodule Ekf.VerificationController do
  use Ekf.Web, :controller
  alias Ekf.SessionController
  
  def verify(conn, params) do
    case Guardian.decode_and_verify(params["token"]) do
      { :ok, claims } -> render(conn, Ekf.SessionView, "verified.json", %{}) 
      { :error, reason } -> SessionController.unauthenticated(conn, params)
    end
  end
end
