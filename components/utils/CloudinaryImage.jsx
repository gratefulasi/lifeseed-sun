import { CloudinaryContext } from 'cloudinary-react';
import { IconButton } from '@material-ui/core';
import PhotoIcon from '@material-ui/icons/PhotoCameraOutlined';

export const openUploadWidget = (callback) => {
  window.cloudinary.openUploadWidget(
    {
      cloudName: 'lifeseed',
      uploadPreset: 'lifeseed',
      sources: ['local', 'camera'],
      showAdvancedOptions: false,
      // cropping: true,
      multiple: false,
      defaultSource: 'camera',
      styles: {
        palette: {
          window: 'yellow',
          sourceBg: '#f4f4f5',
          windowBorder: '#90a0b3',
          tabIcon: '#000000',
          inactiveTabIcon: '#555a5f',
          menuIcons: '#555a5f',
          link: '#0433ff',
          action: '#339933',
          inProgress: '#0433ff',
          complete: '#339933',
          error: '#cc0000',
          textDark: '#000000',
          textLight: '#fcfffd',
        },
        fonts: {
          default: null,
          'sans-serif': {
            url: null,
            active: true,
          },
        },
      },
    },
    callback
  );
};

export default function cloudinaryImage({ setImage, style }) {
  const beginUpload = () => {
    openUploadWidget((error, photos) => {
      if (!error) {
        if (photos.event === 'success') {
          setImage(photos.info.secure_url);
        }
      } else {
      }
    });
  };
  return (
    <CloudinaryContext
      cloudName="lifeseed"
      style={
        style || {
          position: 'absolute',
          top: '-17%',
          right: '7%',
        }
      }
    >
      <IconButton
        onClick={() => beginUpload('image')}
        style={{ backgroundColor: '#fafafa' }}
      >
        <PhotoIcon />
      </IconButton>
    </CloudinaryContext>
  );
}
