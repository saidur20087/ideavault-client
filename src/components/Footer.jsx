

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">IV</div>
            <span className="font-bold text-white">IdeaVault</span>
          </div>
          <p className="text-sm">Empowering the next generation of entrepreneurs.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Platform</h4>
          <div className="space-y-2 text-sm">Ideas • Categories • Trending</div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Contact</h4>
          <div className="text-sm">support@ideavault.com</div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex gap-4">X • LinkedIn • Instagram</div>
        </div>
      </div>
      <div className="text-center mt-12 text-xs">© 2026 IdeaVault. All rights reserved.</div>
    </footer>
  );
};

export default Footer;