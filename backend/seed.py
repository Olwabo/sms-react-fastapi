from database import SessionLocal
from models import Module

db = SessionLocal()

modules = [
    "Programming 1",
    "Database Systems",
    "Networking",
    "Web Development",
    "Operating Systems"
]

try:
    for module_name in modules:
        # Check if the module already exists
        existing_module = (
            db.query(Module)
            .filter(Module.module_name == module_name)
            .first()
        )

        if not existing_module:
            db.add(Module(module_name=module_name))

    db.commit()
    print("Modules seeded successfully!")

except Exception as e:
    db.rollback()
    print(f"Error: {e}")

finally:
    db.close()