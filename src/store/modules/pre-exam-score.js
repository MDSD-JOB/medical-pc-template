const preExamScore = {
  state: {
    scoreMan: {
      patientName: '',
      patientAge: '',
      patientGender: ''
    },
    scoreInfo: []
  },
  mutations: {
    SET_SCORE_MAN: (state, man) => {
      state.scoreMan = man
    },
    SET_SCORE_INFO: (state, scoreInfo) => {
      state.scoreInfo = scoreInfo
    }
  }
}

export default preExamScore
