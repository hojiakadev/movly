import { Modal } from 'antd';

import classes from './Trailer.module.scss';

type IProps = {
  open: boolean;
  title: string;
  /** YouTube video key from TMDB `/videos`. */
  videoKey?: string;
  onClose: () => void;
};

const Trailer = ({ open, title, videoKey, onClose }: IProps) => (
  <Modal open={open && Boolean(videoKey)} title={title} onCancel={onClose} footer={null} width={880} destroyOnHidden>
    <div className={classes.frame}>
      {videoKey && (
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${videoKey}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  </Modal>
);

export default Trailer;
