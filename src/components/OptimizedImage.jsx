
/**
 * A component to render an optimized image with modern formats (AVIF, WebP),
 * lazy loading, and other performance attributes.
 *
 * Note: Automatic filename generation (replacing .jpg with .avif) is removed
 * because it breaks when using Webpack 'require' due to file hashing.
 *
 * @param {object} props
 * @param {string} props.src - The URL for the fallback image (e.g., .jpg or .png).
 * @param {string} props.alt - The alt text for the image.
 * @param {number | string} props.width - The intrinsic width of the image.
 * @param {number | string} props.height - The intrinsic height of the image.
 * @param {'lazy' | 'eager'} [props.loading='lazy'] - The native loading attribute. 'eager' should be used for above-the-fold images.
 * @param {string} [props.className] - CSS classes for the image.
 * @param {string} [props.srcSet] - The srcset for responsive images (for the fallback format).
 * @param {string} [props.sizes] - The sizes attribute for responsive images.
 * @param {string} [props.avifSrc] - Optional explicit source for AVIF format.
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  loading = 'eager',
  className,
  srcSet,
  sizes,
  avifSrc,
  ...props
}) => {
  // If an explicit AVIF source is provided, use the picture tag.
  if (avifSrc) {
    return (
      <picture>
        <source srcSet={avifSrc} type="image/avif" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          className={className}
          srcSet={srcSet}
          sizes={sizes}
          {...props}
        />
      </picture>
    );
  }

  return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={className}
        srcSet={srcSet}
        sizes={sizes}
        {...props}
      />
  );
};

export default OptimizedImage;