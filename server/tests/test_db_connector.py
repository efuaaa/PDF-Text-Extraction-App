import pytest
from copy import deepcopy
from server.db_connector import DB  # Replace with the correct import path

# Test for DB class insert method
def test_insert():
    db = DB()
    entry = {"name": "Alice", "age": 30}
    db.insert("user1", entry)

    # Assert that the entry is correctly inserted
    assert db.db["user1"] == entry

# Test for DB class get method
def test_get():
    db = DB()
    entry = {"name": "Bob", "age": 25}
    db.insert("user2", entry)

    # Assert that the get method retrieves the correct entry
    result = db.get("user2")
    assert result == entry

# Test for DB class entry_exists method
def test_entry_exists():
    db = DB()
    entry = {"name": "Charlie", "age": 40}
    db.insert("user3", entry)

    # Assert that entry_exists returns True when the entry exists
    assert db.entry_exists("user3") is True
    # Assert that entry_exists returns False for non-existing entries
    assert db.entry_exists("user_not_found") is False

# Test for DB class get_all_grouping_by_id method
def test_get_all_grouping_by_id():
    db = DB()
    entry1 = {"name": "Dave", "age": 22}
    entry2 = {"name": "Eve", "age": 29}
    db.insert("user4", entry1)
    db.insert("user5", entry2)

    # Assert that get_all_grouping_by_id returns a deepcopy of the db
    result = db.get_all_grouping_by_id()
    assert result == {"user4": entry1, "user5": entry2}

    # Verify that modifying the result does not affect the original db
    result["user4"]["age"] = 23
    assert db.db["user4"]["age"] == 22  # Original DB should remain unchanged

# Test for DB class update method
def test_update():
    db = DB()
    entry = {"name": "Frank", "age": 50}
    db.insert("user6", entry)

    updated_fields = {"age": 51}
    db.update("user6", updated_fields)

    # Assert that the update method modifies the correct fields
    assert db.db["user6"]["age"] == 51

    # Ensure the other fields remain unchanged
    assert db.db["user6"]["name"] == "Frank"

    # Test updating multiple fields
    db.update("user6", {"name": "Franklin", "age": 52})
    assert db.db["user6"]["name"] == "Franklin"
    assert db.db["user6"]["age"] == 52
