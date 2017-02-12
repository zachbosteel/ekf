defmodule Ekf.Router do
  use Ekf.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Ekf do
    pipe_through :api

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    resources "/users", UserController, only: [:create]

    resources "/images", ImageController
    resources "/texts", TextController
    resources "/static_page", StaticPageController
    resources "/class_page", ClassPageController
    resources "/instructor_page", InstructorPageController
  end

  scope "/", Ekf do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get"/*path", PageController, :index
  end
end
