defmodule Ekf.Factory do
  use ExMachina.Ecto, repo: Ekf.Repo

  def class_page_factory do
    %Ekf.ClassPage{
      title: "Martial Arts!"
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
      alt: "me, waving at the camera"
    }
  end

  def text_factory do
    %Ekf.Text{
      body: "This is a paragraph about some stuff. Look at meeee!"
    }
  end

  def static_page_factory do
    %Ekf.StaticPage{
      title: "Home"
    }
  end
end