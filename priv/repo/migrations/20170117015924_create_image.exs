defmodule Ekf.Repo.Migrations.CreateImage do
  use Ecto.Migration

  def change do
    create table(:images) do
      add :path, :string
      add :title, :string
      add :alt, :string

      timestamps()
    end

  end
end
