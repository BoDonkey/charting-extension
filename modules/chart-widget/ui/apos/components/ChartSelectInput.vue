<script>
import { ref, reactive, watch, onMounted } from 'vue';
import AposInputSelect from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposInputSelect.vue';

export default {
  name: "ChartSelectInput",
  components: {
    AposInputSelect
  },
  extends: AposInputSelect,
  setup(props) {
    const choices = ref([]);
    const field = reactive({ choices: [] });

    const setChoices = (chartData = {}) => {
      const columnValues = chartData?.columns;
      console.log('columnValues', columnValues);
      choices.value = [
        {
          label: '',
          value: 'undefined'
        },
        ...(columnValues || []).map(column => ({
          label: column,
          value: column
        }))
      ];
      field.choices = choices.value;
    };

    watch(() => props.followingValues, (newValue, oldValue) => {
      if (oldValue !== newValue) {
        const [chartdataSet] = newValue?.['<_chartdataSet'] || [];
        setChoices(chartdataSet);
      }
    });

    onMounted(() => {
      setChoices(props.followingValues?.['<_chartdataSet']?.[0]);
    });

    return {
      choices,
      field,
      setChoices
    };
  }
};
</script>
