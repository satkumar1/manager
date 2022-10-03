import * as React from 'react';
import { useHistory } from 'react-router-dom';
import LinodeSvg from 'src/assets/icons/entityIcons/linode.svg';
import Typography from 'src/components/core/Typography';
import Placeholder from 'src/components/Placeholder';
import LinksSection from './LinksSection';
import LinksSubSection from './LinksSubSection';
import DocsIcon from 'src/assets/icons/docs.svg';
import MarketplaceIcon from 'src/assets/icons/marketplace.svg';
import YoutubeIcon from 'src/assets/icons/youtube.svg';
import PointerIcon from 'src/assets/icons/pointer.svg';
import ExternalLinkIcon from 'src/assets/icons/external-link.svg';
import Link from 'src/components/Link';
import List from 'src/components/core/List';
import ListItem from 'src/components/core/ListItem';
import AppsSection from './AppsSection';
import { sendEvent } from 'src/utilities/ga';

const gaCategory = 'Linodes landing page empty';

const linkGAEventTemplate = {
  category: gaCategory,
  action: 'Click:link',
};

const gettingStartedGuideLinksData = [
  {
    to: 'https://www.linode.com/docs/guides/creating-a-compute-instance/',
    text: 'Create a Compute Instance',
  },
  {
    to: 'https://www.linode.com/docs/guides/getting-started/',
    text: 'Getting Started with Linode Compute Instances',
  },
  {
    to:
      'https://www.linode.com/docs/guides/understanding-billing-and-payments/',
    text: 'Understanding Billing and Payment',
  },
  {
    to: 'https://www.linode.com/docs/guides/set-up-web-server-host-website/',
    text: 'Hosting a Website or Application on Linode',
  },
];

const youtubeLinksData = [
  {
    to: 'https://www.youtube.com/watch?v=KEK-ZxrGxMA',
    text: 'Linode Getting Started Guide',
  },
  {
    to: 'https://www.youtube.com/watch?v=AVXYq8aL47Q',
    text: 'Common Linux Commands',
  },
  {
    to: 'https://www.youtube.com/watch?v=lMC5VNoZFhg',
    text: 'Copying Files to a Compute Instance',
  },
  {
    to:
      'https://www.youtube.com/watch?v=ZVMckBHd7WA&list=PLTnRtjQN5ieb4XyvC9OUhp7nxzBENgCxJ&index=2',
    text: 'How to use SSH',
  },
];

const getLinkOnClick = (linkText: string) => () => {
  sendEvent({
    ...linkGAEventTemplate,
    label: linkText,
  });
};

const GuideLinks = () => (
  <List>
    {gettingStartedGuideLinksData.map((linkData) => (
      <ListItem key={linkData.to}>
        <Link to={linkData.to} onClick={getLinkOnClick(linkData.text)}>
          {linkData.text}
        </Link>
      </ListItem>
    ))}
  </List>
);

const YoutubeLinks = () => (
  <List>
    {youtubeLinksData.map((linkData) => (
      <ListItem key={linkData.to}>
        <Link onClick={getLinkOnClick(linkData.text)} to={linkData.to}>
          {linkData.text}
          <ExternalLinkIcon style={{ marginLeft: 8 }} />
        </Link>
      </ListItem>
    ))}
  </List>
);

export const ListLinodesEmptyState: React.FC<{}> = (_) => {
  const { push } = useHistory();

  const onLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const label = event.currentTarget.textContent ?? '';
    sendEvent({ ...linkGAEventTemplate, label: label });
  };

  return (
    <Placeholder
      title={'Linodes'}
      subtitle="Cloud-based virtual machines"
      icon={LinodeSvg}
      isEntity
      buttonProps={[
        {
          onClick: () => {
            push('/linodes/create');
            sendEvent({
              category: gaCategory,
              action: 'Click:button',
              label: 'Create Linode',
            });
          },
          children: 'Create Linode',
        },
      ]}
      linksSection={
        <LinksSection>
          <LinksSubSection
            title="Getting Started Guides"
            icon={<DocsIcon />}
            moreLink={
              <Link onClick={onLinkClick} to="https://www.linode.com/docs/">
                Check out all our Docs <PointerIcon />
              </Link>
            }
          >
            <GuideLinks />
          </LinksSubSection>
          <LinksSubSection
            title="Deploy an App"
            icon={<MarketplaceIcon />}
            moreLink={
              <Link onClick={onLinkClick} to="/linodes/create?type=One-Click">
                See all Marketplace apps <PointerIcon />
              </Link>
            }
          >
            <AppsSection />
          </LinksSubSection>
          <LinksSubSection
            title="Getting Started Playlist"
            icon={<YoutubeIcon />}
            moreLink={
              <Link
                onClick={onLinkClick}
                to="https://www.youtube.com/playlist?list=PLTnRtjQN5ieb4XyvC9OUhp7nxzBENgCxJ"
              >
                View the complete playlist{' '}
                <ExternalLinkIcon style={{ marginLeft: 8 }} />
              </Link>
            }
          >
            <YoutubeLinks />
          </LinksSubSection>
        </LinksSection>
      }
    >
      <Typography
        style={{ fontSize: '1.125rem', lineHeight: '1.75rem', maxWidth: 541 }}
      >
        Host your websites, applications, or any other Cloud-based workloads on
        a scalable and reliable platform.
      </Typography>
    </Placeholder>
  );
};

export default React.memo(ListLinodesEmptyState);
