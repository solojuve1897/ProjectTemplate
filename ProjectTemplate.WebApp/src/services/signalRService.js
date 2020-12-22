import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl(process.env.REACT_APP_WebAPI + '/hub')
  .configureLogging(signalR.LogLevel.Information)
  .build();

export async function startSignalRConnection() {
  try {
    await connection.start();
    console.log('SignalR Connected.');
  } catch (err) {
    console.log(err);
    setTimeout(startSignalRConnection, 5000);
  }
}

export async function stopSignalRConnection() {
  await connection.stop();
}

connection.onclose(startSignalRConnection);

export default connection;
