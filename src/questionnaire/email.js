import axios from 'axios';

const createEmail = (questions, consentAccepted, consentShort, consentLong) => {
  const answers = [];
  for (const question in questions) {
    answers.push(`${question}: ${questions[question]}`);
  }

  answers.push(`timestamp: ${new Date().toISOString()}`)

  if (consentAccepted) {
    answers.push(`consent: ${consentAccepted}`);
  }
  if (consentShort) {
    answers.push(`consentShort: ${consentShort}`)
  }
  if (consentLong) {
    answers.push(`consentLong: ${consentLong}`)
  }

  return answers.join('\n');
}

const sendEmail = async (recipient, body) => {
  const url = `${SERVER_ADDRESS}/api/save-questionnaire`;
  const data = body;

  const request = {
    url,
    headers: {'x-apikey': NODE_APIKEY},
    method: 'post',
    data: {
      recipient,
      data,
    },
  }

  const result = await axios(request);
  return result;
}

export {
  createEmail,
  sendEmail
}
