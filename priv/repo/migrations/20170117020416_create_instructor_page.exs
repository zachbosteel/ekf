defmodule Ekf.Repo.Migrations.CreateInstructorPage do
  use Ecto.Migration

  def change do
    create table(:instructor_page) do
      add :title, :string

      timestamps()
    end

  end
end
