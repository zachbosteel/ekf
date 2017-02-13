defmodule Ekf.InstructorPage do
  use Ekf.Web, :model

  schema "instructor_page" do
    has_many :texts, Ekf.Text
    has_many :images, Ekf.Image
    field :title, :string
    field :slug, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :slug])
    |> validate_required([:title, :slug])
  end
end
