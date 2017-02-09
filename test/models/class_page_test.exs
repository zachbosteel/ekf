defmodule Ekf.ClassPageTest do
  use Ekf.ModelCase

  alias Ekf.ClassPage

  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ClassPage.changeset(%ClassPage{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ClassPage.changeset(%ClassPage{}, @invalid_attrs)
    refute changeset.valid?
  end
end
