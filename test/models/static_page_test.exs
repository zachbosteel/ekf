defmodule Ekf.StaticPageTest do
  use Ekf.ModelCase

  alias Ekf.StaticPage

  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = StaticPage.changeset(%StaticPage{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = StaticPage.changeset(%StaticPage{}, @invalid_attrs)
    refute changeset.valid?
  end
end
