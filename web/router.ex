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
  end

  pipeline :admin do
    plug :accepts, ["html"]
    # plug :authenticate_user
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", Ekf do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/api", Ekf do
    pipe_through :api

    resources "/images", ImageController
    resources "/texts", TextController
    resources "/static_page", StaticPageController
    resources "/class_page", ClassPageController
    resources "/instructor_page", InstructorPageController
  end

  scope "/admin", Ekf do
    pipe_through :admin
  end
end
