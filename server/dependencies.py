from server.db_connector import get_db_instance


class Dependencies:
    def __init__(self):
        self.in_memory_database = get_db_instance()

    def get_database(self):
        return self.in_memory_database
