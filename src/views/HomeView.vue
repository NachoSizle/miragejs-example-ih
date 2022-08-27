<template>
  <div class="home">
    <h1>Home</h1>
    <ul>
      <li v-for="reminder in reminders" :key="reminder.id">
        {{ reminder.title }}
        <button @click="changeTitle(reminder.id)">Change title</button>
      </li>
    </ul>

    <button @click="sendData">Send data</button>
    <button @click="changeData">Change data</button>
    <button @click="removeData">Remove data</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import RemindersStore from '@/store/index';

export default {
  name: 'HomeView',
  computed: {
    ...mapState(RemindersStore, ['reminders']),
  },
  methods: {
    ...mapActions(RemindersStore, ['addNewReminder', 'updateReminder', 'deleteReminder']),
    sendData() {
      const data = {
        id: 4,
        title: 'My reminder',
      };
      this.addNewReminder(data);
    },

    changeData() {
      const data = {
        title: 'My reminder changed',
      };
      this.updateReminder(data, 2);
    },

    removeData() {
      this.deleteReminder(2);
    },

    changeTitle(reminderId) {
      const data = {
        title: 'My reminder changed',
      };
      this.updateReminder(data, reminderId);
    },
  },
};
</script>
