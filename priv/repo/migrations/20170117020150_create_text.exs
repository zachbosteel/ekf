defmodule Ekf.Repo.Migrations.CreateText do
  use Ecto.Migration

  def change do
    create table(:texts) do
      add :body, :string

      timestamps()
    end

  end
end
