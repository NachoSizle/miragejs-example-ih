import { defineStore } from 'pinia';

export default defineStore('remindersStore', {
  state: () => ({
    reminders: [],
    // reminderSelected: null,
  }),
  getters: {
    getReminder(id) {
      return this.reminders.find((reminder) => reminder.id === id);
    },
  },
  actions: {
    async fetchReminders() {
      const remindersResponse = await fetch('https://api.local/reminders');
      const remindersResponseJSON = await remindersResponse.json();
      this.reminders = remindersResponseJSON;
    },
    // async selectReminder(id) {
    //   const response = await fetch(`https://api.local/reminders/${id}`);
    //   const responseJSON = await response.json();
    //   this.reminderSelected = responseJSON;
    // },
    async addNewReminder(reminder) {
      const responseData = await fetch('https://api.local/reminders', {
        method: 'POST',
        body: JSON.stringify(reminder),
      });

      if (responseData.ok) {
        const responseJSON = await responseData.json();
        this.reminders.push(responseJSON);
      }
    },
    async updateReminder(reminder, reminderId) {
      const responseData = await fetch(`https://api.local/reminders/${reminderId}`, {
        method: 'PATCH',
        body: JSON.stringify(reminder),
      });

      if (responseData.ok) {
        const responseJSON = await responseData.json();
        let reminderFounded = this.reminders.find((rem) => rem.id === reminderId);
        // eslint-disable-next-line no-unused-vars
        reminderFounded = Object.assign(reminderFounded, responseJSON);
      }
    },
    async deleteReminder(reminderId) {
      const responseData = await fetch(`https://api.local/reminders/${reminderId}`, {
        method: 'DELETE',
      });
      console.log(responseData);

      if (responseData.ok) {
        const reminderFounded = this.reminders.find((rem) => rem.id === reminderId);
        this.reminders.splice(this.reminders.indexOf(reminderFounded), 1);
      }
    },
  },
});
