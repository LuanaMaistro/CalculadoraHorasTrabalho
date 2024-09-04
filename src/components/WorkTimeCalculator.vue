<template>
  <div class="work-time-calculator">
    <h1>Calculadora de Horário de Trabalho</h1>

    <div class="field">
      <label for="arrivalTime">Hora de Chegada:</label>
      <input type="time" v-model="arrivalTime" id="arrivalTime" />
    </div>

    <div class="field">
      <label for="lunchStartTime">Início do Almoço:</label>
      <input type="time" v-model="lunchStartTime" id="lunchStartTime" />
    </div>

    <div class="field">
      <label for="lunchEndTime">Fim do Almoço:</label>
      <input type="time" v-model="lunchEndTime" id="lunchEndTime" />
    </div>

    <div class="result">
      <label>Horário de Saída:</label>
      <p>{{ departureTime }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'WorkTimeCalculator',
  setup() {
    const arrivalTime = ref('');
    const lunchStartTime = ref('');
    const lunchEndTime = ref('');

    const departureTime = computed(() => {
      if (arrivalTime.value && lunchStartTime.value && lunchEndTime.value) {
        const [arrivalHours, arrivalMinutes] = arrivalTime.value.split(':').map(Number);
        const [lunchStartHours, lunchStartMinutes] = lunchStartTime.value.split(':').map(Number);
        const [lunchEndHours, lunchEndMinutes] = lunchEndTime.value.split(':').map(Number);

        const arrival = new Date();
        arrival.setHours(arrivalHours, arrivalMinutes);

        const lunchStart = new Date(arrival);
        lunchStart.setHours(lunchStartHours, lunchStartMinutes);

        const lunchEnd = new Date(arrival);
        lunchEnd.setHours(lunchEndHours, lunchEndMinutes);

        const workDuration = 8 * 60 * 60 * 1000;
        const lunchDuration = lunchEnd - lunchStart;
        const departure = new Date(arrival.getTime() + workDuration + lunchDuration);

        return departure.toTimeString().slice(0, 5);
      }
      return '---';
    });

    return {
      arrivalTime,
      lunchStartTime,
      lunchEndTime,
      departureTime,
    };
  },
};
</script>

<style scoped>
.work-time-calculator {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.field {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
}

input[type="time"] {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;
}

.result {
  margin-top: 20px;
  text-align: center;
}

p {
  font-size: 1.4em;
  font-weight: bold;
  color: #007bff;
  margin-top: 10px;
}
</style>
