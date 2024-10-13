import { google } from 'googleapis';

const createOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
  );
};

const googleDriveClient = {
  getAuthUrl: (redirectUri: string) => {
    const oauth2Client = createOAuth2Client();
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.readonly'],
      redirect_uri: redirectUri,
    });
  },

  getTokens: async (code: string, redirectUri: string) => {
    const oauth2Client = createOAuth2Client();
    const { tokens } = await oauth2Client.getToken({ code, redirect_uri: redirectUri });
    return tokens;
  },

  setCredentials: (tokens: any) => {
    const oauth2Client = createOAuth2Client();
    oauth2Client.setCredentials(tokens);
  },

  listFiles: async () => {
    const oauth2Client = createOAuth2Client();
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const response = await drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    });
    return response.data.files;
  },
};

export default googleDriveClient;
