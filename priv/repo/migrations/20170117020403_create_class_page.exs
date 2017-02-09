defmodule Ekf.Repo.Migrations.CreateClassPage do
  use Ecto.Migration

  def change do
    create table(:class_page) do
      add :title, :string

      timestamps()
    end

  end
end
