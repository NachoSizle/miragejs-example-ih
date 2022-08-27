import { createServer, Response } from 'miragejs';

const REMINDERS = [
  { id: 1, title: 'Walk the dog' },
  { id: 2, title: 'Take out the trash' },
  { id: 3, title: 'Work out' },
];

export default function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    routes() {
      this.namespace = 'api';
      const url = 'https://api.local';

      this.get(`${url}/reminders`, () => REMINDERS);

      this.get(`${url}/reminders/:id`, (schema, request) => {
        const { id } = request.params;
        return REMINDERS.find((reminder) => reminder.id === parseInt(id, 10));
      });

      this.post(`${url}/reminders`, (schema, request) => {
        console.log(JSON.parse(request.requestBody));
        const { id, title } = JSON.parse(request.requestBody);
        const reminder = { id, title };
        REMINDERS.push(reminder);

        return {
          ...reminder,
        };
      });

      this.patch(`${url}/reminders/:id`, (schema, request) => {
        const { id } = request.params;
        const { title } = JSON.parse(request.requestBody);
        const reminderFounded = REMINDERS.find((reminder) => reminder.id === parseInt(id, 10));
        if (reminderFounded) {
          reminderFounded.title = title;

          return {
            ...reminderFounded,
          };
        }
        return new Response(404, { errors: ['reminder not found'] });
      });

      this.delete(`${url}/reminders/:id`, (schema, request) => {
        const { id } = request.params;
        const reminderFounded = REMINDERS.find((reminder) => reminder.id === parseInt(id, 10));
        if (reminderFounded) {
          REMINDERS.splice(REMINDERS.indexOf(reminderFounded), 1);

          return {
            ...reminderFounded,
          };
        }
        return new Response(404, { errors: ['reminder not found'] });
      });
    },
  });
}
