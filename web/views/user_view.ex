defmodule Ekf.UserView do
  use Ekf.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, Ekf.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, Ekf.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      username: user.username,
      email: user.email,
      password_hash: user.password_hash}
  end
end
