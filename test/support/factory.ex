defmodule Ekf.Factory do
  use ExMachina.Ecto, repo: Ekf.Repo

  def class_page_factory do
    %Ekf.ClassPage{
      title: "Martial Arts!",
      slug: "martial-arts"
    }
  end

  def instructor_page_factory do
    %Ekf.InstructorPage{
      title: "Captain America!"
    }
  end

  def image_factory do
    %Ekf.Image{
      path: "/my_pic",
      title: "Look at me!",
      alt: "me, waving at the camera",
      label: "some label",
      image: %{file_name: "image.jpg", updated_at: Ecto.DateTime.utc}
    }
  end

  def text_factory do
    %Ekf.Text{
      body: "This is a paragraph about some stuff. Look at meeee!",
      label: "some label"
    }
  end

  def static_page_factory do
    %Ekf.StaticPage{
      title: "Home"
    }
  end
end
