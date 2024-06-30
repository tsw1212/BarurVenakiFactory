import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import InboxIcon from '@mui/icons-material/Inbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Typography from '@mui/material/Typography';


const statusOptions = ['התקבלה', 'אושרה', 'בתהליך הכנה', 'נשלחה', 'הסתיימה'];


const statusIcons = {
    התקבלה: <InboxIcon />,
    אושרה: <CheckCircleIcon />,
    'בתהליך הכנה': <BuildIcon />,
    נשלחה: <LocalShippingIcon />,
    הסתיימה: <DoneAllIcon />
  };

export default function OrderTimeline({ currentStatus }) {

  const currentIndex = statusOptions.indexOf(currentStatus);

  return (
    <Timeline position="alternate">
      {statusOptions.map((status, index) => (
        <TimelineItem key={status}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {status}
          </TimelineOppositeContent>
          <TimelineSeparator>
            {index > 0 && <TimelineConnector sx={{ bgcolor: index <= currentIndex ? 'primary.main' : 'grey.500' }} />}
            <TimelineDot color={index <= currentIndex ? 'primary' : 'grey'}>
              {statusIcons[status]}
            </TimelineDot>
            {index < statusOptions.length - 1 && (
              <TimelineConnector sx={{ bgcolor: index < currentIndex ? 'primary.main' : 'grey.500' }} />
            )}
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              {status}
            </Typography>
            <Typography>       </Typography> 
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
