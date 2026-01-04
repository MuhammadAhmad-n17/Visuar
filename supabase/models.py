# models.py
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    full_name = Column(String)

    profile = relationship("Profile", back_populates="user", uselist=False,
                           cascade="all, delete-orphan", passive_deletes=True)

class Profile(Base):
    __tablename__ = "profile"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    occupation = Column(String)
    average_screen_time = Column(Integer)
    glasses_user = Column(String)
    lens_power = Column(String, nullable=True)
    lighting_environment = Column(String)
    work_environment = Column(String)
    diet_habits = Column(String)
    eye_pain_or_headache = Column(String)
    sleep_hours = Column(Integer)
    medical_history = Column(String, nullable=True)
    smoker = Column(String, nullable=True)
    alcohol_consumption = Column(String, nullable=True)
    exercise_frequency = Column(String, nullable=True)
    water_intake = Column(String, nullable=True)

    user = relationship("User", back_populates="profile")