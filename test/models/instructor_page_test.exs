defmodule Ekf.InstructorPageTest do
  use Ekf.ModelCase

  alias Ekf.InstructorPage

  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = InstructorPage.changeset(%InstructorPage{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = InstructorPage.changeset(%InstructorPage{}, @invalid_attrs)
    refute changeset.valid?
  end
end
