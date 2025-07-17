export default function Map() {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 rounded-2xl overflow-hidden shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2092567873856!2d-73.98586346451117!3d40.757422059063884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sit!2sit!4v1752760798348!5m2!1sit!2sit"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
      />
    </div>
  );
}
