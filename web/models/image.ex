defmodule Ekf.Image do
  use Ekf.Web, :model

  schema "images" do
    belongs_to :static_page, Ekf.StaticPage
    belongs_to :class_page, Ekf.ClassPage
    belongs_to :instructor_page, Ekf.InstructorPage
    field :path, :string
    field :title, :string
    field :alt, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:path, :title, :alt, :static_page_id, :class_page_id, :instrutor_page_id])
    |> validate_required([:path, :title, :alt])
  end
end
