  function getMNBRate(currency, date) {
    const curr      = currency.toUpperCase();
    const operation = date ? 'GetExchangeRates' : 'GetCurrentExchangeRates';

    let body;
    if (date) {
      const end   = date instanceof Date ? date : new Date(date);
      const start = new Date(end);
      start.setDate(start.getDate() - 7);

      body = `<GetExchangeRates xmlns="http://www.mnb.hu/webservices/">
        <startDate>${toDateStr(start)}</startDate>
        <endDate>${toDateStr(end)}</endDate>
        <currencyNames>${curr}</currencyNames>
      </GetExchangeRates>`;
    } else {
      body = `<GetCurrentExchangeRates xmlns="http://www.mnb.hu/webservices/" />`;
    }

    const soap = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                 xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>${body}</soap:Body>
  </soap:Envelope>`;

    const response = UrlFetchApp.fetch('http://www.mnb.hu/arfolyamok.asmx', {
      method: 'post',
      contentType: 'text/xml; charset=utf-8',
      headers: { SOAPAction: `http://www.mnb.hu/webservices/MNBArfolyamServiceSoap/${operation}` },
      payload: soap,
      muteHttpExceptions: true
    });

    if (response.getResponseCode() !== 200)
      throw new Error('HTTP ' + response.getResponseCode());

    const soapNs = XmlService.getNamespace('http://schemas.xmlsoap.org/soap/envelope/');
    const mnbNs  = XmlService.getNamespace('http://www.mnb.hu/webservices/');
    const inner  = XmlService.parse(response.getContentText()).getRootElement()
      .getChild('Body', soapNs)
      .getChild(operation + 'Response', mnbNs)
      .getChild(operation + 'Result', mnbNs)
      .getText();

    const days = XmlService.parse(inner).getRootElement().getChildren('Day');
    if (!days.length) throw new Error('No data found');

    const day  = date ? days[days.length - 1] : days[0];
    const rate = day.getChildren('Rate')
      .find(r => r.getAttribute('curr').getValue() === curr);
    if (!rate) throw new Error('Currency not found: ' + curr);

    return parseFloat(rate.getText().replace(',', '.')) / Number(rate.getAttribute('unit').getValue());
  }

  function toDateStr(date) {
    const d = date instanceof Date ? date : new Date(date);
    return Utilities.formatDate(d, 'Europe/Budapest', 'yyyy-MM-dd');
  }
