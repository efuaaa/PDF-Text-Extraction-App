from copy import deepcopy
from typing import Dict


class DB:
    def __init__(self):
        self.db = {}

    def insert(self, id: str, entry: Dict):
        self.db[id] = entry

    def get(self, id: str):
        return self.db[id]

    def entry_exists(self, id: str):
        return id in self.db

    def get_all_grouping_by_id(self):
        return deepcopy(self.db)

    def update(self, id: str, updated_fields: Dict):
        entry = self.db[id]
        for field, value in updated_fields.items():
            entry[field] = value


def get_db_instance():
    return DB()
