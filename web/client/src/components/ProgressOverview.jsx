import React from 'react';
import { Card, CardContent, Typography, Grid, LinearProgress, Skeleton } from '@mui/material';
import { calculateDeliveryPercentage } from '../service/progress';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProgressOverview = ({ boxes, scans }) => {
  const deliveryResults = boxes && scans ? calculateDeliveryPercentage(boxes, scans) : [];
  const { t } = useTranslation();

  if (boxes?.length && scans?.length)
    return (
      <Card>
        <CardContent>
          <Typography variant="overline" gutterBottom>
            {t('progressOverview')}
          </Typography>
          <Grid container spacing={2}>
              {deliveryResults.map((result) => (
                <Grid item xs={9} sm={6} md={3} key={result.project}>
                  <Link to={`/boxes?query=${result.project}`} style={{ textDecoration: 'none' }}>
                    <Card>
                      <CardContent sx={{'&:hover': {backgroundColor: 'neutral.100'}}}>
                        <Typography variant="subtitle1">{result.project}</Typography>
                        <Typography variant="h4" component="div" gutterBottom>
                          {result.deliveryPercentage}%
                        </Typography>
                        <LinearProgress color={'success'} variant="determinate" value={result.deliveryPercentage} />
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
        </CardContent>
      </Card>
    );
};

export default ProgressOverview;
