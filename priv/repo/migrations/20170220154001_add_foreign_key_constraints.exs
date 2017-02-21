defmodule Ekf.Repo.Migrations.AddForeignKeyConstraints do
  use Ecto.Migration

  def change do
    alter table(:images) do
      modify :class_page_id, references(:class_page, on_delete: :delete_all)
      modify :instructor_page_id, references(:instructor_page, on_delete: :delete_all)
    end

    alter table(:texts) do
      modify :class_page_id, references(:class_page, on_delete: :delete_all)
      modify :instructor_page_id, references(:instructor_page, on_delete: :delete_all)
    end

  end
end
