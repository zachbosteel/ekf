defmodule Ekf.ImageTest do
  use Ekf.ModelCase

  alias Ekf.Image

  @valid_attrs %{
    alt: "some content",
    path: "some content",
    title: "some content",
    label: "some content",
    image: "./tests/fixtures/image.png"
  }
  @invalid_attrs %{}

  # test "changeset with valid attributes" do
  #   changeset = Image.changeset(%Image{}, @valid_attrs)
  #   IO.inspect(changeset)
  #   assert changeset.valid?
  # end

  test "changeset with invalid attributes" do
    changeset = Image.changeset(%Image{}, @invalid_attrs)
    refute changeset.valid?
  end
end
