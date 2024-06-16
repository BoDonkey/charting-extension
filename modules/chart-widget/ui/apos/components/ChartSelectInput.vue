<script>
import AposInputSelect from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposInputSelect.vue';

export default {
  name: "ChartSelectInput",
  components: {
    AposInputSelect
  },
  extends: AposInputSelect,
  // emits: [ 'return' ],
  // data () {
  //   return {
  //     wasPopulated: true
  //   };
  // },
  mounted() {
    console.log('following', this.followingValues?.['<_chartdataSet']?.[0], this.followingValues);
    //this.setChoices(Object.values(this.followingValues)[0]);
    this.setChoices(this.followingValues?.['<_chartdataSet']?.[0]);
  },
  methods: {
    setChoices(chartData = {}) {
      console.log('chartData setChoices', chartData);
      const columnValues = chartData?.columns;
      this.choices = [
        {
          label: '',
          value: 'undefined'
        },
        ...(columnValues || []).map(column => ({
          label: column,
          value: column
        }))
      ];
      this.field.choices = this.choices;
    }
  },
  watch: {
    followingValues: {
      handler(newValue, oldValue) {
        if (oldValue !== newValue ){
          const [ chartdataSet ]  = newValue?.['<_chartdataSet'] || [];
          this.setChoices(chartdataSet);
        }
      }
    }
  }
};
</script>