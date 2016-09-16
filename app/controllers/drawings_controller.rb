class DrawingsController < ApplicationController
  def new
    @drawing = Drawing.new
  end

  def create
    points = []
    params[:points].each do |key, value|
      points << Point.new(x: value[:x], y: value[:y])
    end
    Drawing.create(points: points)
  end
end
