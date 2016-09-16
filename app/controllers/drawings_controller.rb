class DrawingsController < ApplicationController
  def new
    @drawing = Drawing.new
  end

  def create
    insert_with_raw_sql
    # insert_normally
  end

  def insert_normally
    points = []
    params[:points].each do |key, value|
      points << Point.new(x: value[:x], y: value[:y])
    end
    Drawing.create(points: points)
  end

  def insert_with_raw_sql
    drawing = Drawing.create
    points = []
    params[:points].each do |key, value|
      points << "(#{value[:x]}, #{value[:y]}, #{drawing.id})"
    end
    sql = "INSERT INTO points (`x`, `y`, `drawing_id`) VALUES #{points.join(", ")}"
    ActiveRecord::Base.connection.execute sql
  end
end
