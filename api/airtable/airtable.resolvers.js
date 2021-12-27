const Airtable = require('airtable');
require('dotenv').config();

const { BASE, AIRTABLE_API_KEY } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(BASE);
const table = base('Table 1');

console.log({ BASE, AIRTABLE_API_KEY });

const airtableResolvers = {
  Query: {
    async getUsers() {
      const records = await table
        .select({ maxRecords: 3, view: 'Grid view' })
        .firstPage();

      const users = records.map(({ id, fields }) => ({
        id,
        ...fields,
      }));
      return users;
    },
    async getUserById(_, { id }) {
      const record = await table.find(id);
      return { id: record.id, ...record.fields };
    },
  },
  Mutation: {
    async createUser(_, { createUserInput }) {
      const [record] = await table.create([
        {
          fields: createUserInput,
        },
      ]);
      return { id: record.id, ...record.fields };
    },

    async updateUser(_, { updateUserInput }) {
      const { id, ...fields } = updateUserInput;
      const [record] = await table.update([
        {
          id,
          fields,
        },
      ]);
      return { id: record.id, ...record.fields };
    },

    async deleteUser(_, { id }) {
      try {
        const [reconrd] = await table.destroy([id]);
        console.log({ reconrd });
        return true;
      } catch (error) {
        console.log(err);
        return false;
      }
    },
  },
};

module.exports = airtableResolvers;
